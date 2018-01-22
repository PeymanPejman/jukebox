import static org.junit.Assert.*;
import org.junit.*;
import java.util.concurrent.*;
import java.util.*;
import java.io.*;

public class JBWatcherTest {

  private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
  JBWatcher watcher;
  
  @Before 
  public void createWather() {
    watcher = new JBWatcher("test-JBId");
    System.setOut(new PrintStream(outContent));
  }

  @Test
  public void testRun() {
    watcher.run();
    assertNotNull(outContent.toString());
    assertTrue(true);
  }

  @After
  public void cleanUp(){
    watcher = null;
    System.setOut(System.out);
  }

}
