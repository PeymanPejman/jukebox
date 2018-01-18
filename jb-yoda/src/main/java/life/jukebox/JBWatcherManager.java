import java.util.*;

public class JBWatcherManager {
	private ScheduledExecutorService scheduler;
	private Set<JBWatcher> activeWatchers;
	private static JBWatcherManager manager;
	private final long WATCHER_PERIOD = 10;

	protected JBWatcherManager() {
		scheduler = Executors.newScheduledThreadPool(4);
		activeWatchers = new HashSet<JBWatcher>();
	}

	public static JBWatcherManager getInstance() {
		if (manager == null) {
			manager = new JBWatcherManager();
		}
		return manager;
	}
	
	public void addWatcher(watcher) {
		if (!activeWatchers.add(watcher)) return;
		ScheduledFuture<?> watcherHandle = scheduler.scheduleAtFixedRate(watcher, 0, WATCHER_PERIOD, TimeUnit.SECONDS);
		watcher.setWatcherHandle(watcherHandle);
	}

	public void killWatcher(watcher) {
		if (!activeWatchers.remove(watcher)) return;
		watcher.getWatcherHandle().cancel(false);
	}
}