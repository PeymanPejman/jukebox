package life.jukebox.yoda;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * A simple client that requests a greeting from the YodaGrpcServer.
 */
public class YodaGrpcClient {
  private static final int DEFAULT_JB_YODA_SERVICE_PORT = 37000;
  private static final String DEFAULT_JB_YODA_SERVICE_HOST = "localhost";

  private static final Logger logger = Logger.getLogger(YodaGrpcClient.class.getName());

  private final ManagedChannel channel;
  private final YodaGrpc.YodaBlockingStub blockingStub;

  public YodaGrpcClient(String host, int port) {
    this(ManagedChannelBuilder.forAddress(host, port)
        // Channels are secure by default (via SSL/TLS). For the example we disable TLS to avoid
        // needing certificates.
        .usePlaintext(true)
        .build());
  }

  /** Construct client for accessing RouteGuide server using the existing channel. */
  YodaGrpcClient(ManagedChannel channel) {
    this.channel = channel;
    blockingStub = YodaGrpc.newBlockingStub(channel);
  }

  public void shutdown() throws InterruptedException {
    channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
  }

  public void shake(String name) {
    logger.info("Will try to greet " + name + " ...");
    HandshakeRequest request = HandshakeRequest.newBuilder().setName(name).build();
    HandshakeResponse response;
    try {
      response = blockingStub.shake(request);
    } catch (StatusRuntimeException e) {
      logger.log(Level.WARNING, "RPC failed: {0}", e.getStatus());
      return;
    }
    logger.info("Greeting: " + response.getMessage());
  }

  private static int getPort(){
    return System.getenv("JB_YODA_SERVICE_PORT") != null ?
      Integer.parseInt(System.getenv("JB_YODA_SERVICE_PORT")) : DEFAULT_JB_YODA_SERVICE_PORT;
  }

  private static String getHost(){
    return System.getenv("JB_YODA_SERVICE_HOST") != null ?
      System.getenv("JB_YODA_SERVICE_HOST") : DEFAULT_JB_YODA_SERVICE_HOST;
  }


  public static void main(String[] args) throws Exception {
    YodaGrpcClient client = new YodaGrpcClient(getHost(), getPort());
    try {
      String user = "Peyman";
      client.shake(user);
    } finally {
      client.shutdown();
    }
  }
}
