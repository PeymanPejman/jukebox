import java.util.concurrent.*;

public class JBWatcher implements Runnable{
	private ScheduledFuture<?> watcherHandle;
	private String jbId;

	public JBWatcher(String jbId) {
		this.jbId = jbId;
	}

	public ScheduledFuture<?> getWatcherHandle(){
		return watcherHandle;
	} 

	public void setWatcherHandle(ScheduledFuture<?> watcherHandle){
		this.watcherHandle = watcherHandle;
	}

	public void run(){
		System.out.println("Spotify API call to get current playing track");
	}
}