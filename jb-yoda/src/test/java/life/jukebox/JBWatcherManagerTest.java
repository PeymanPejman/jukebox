import static org.junit.Assert.*;
import org.junit.*;

import java.util.concurrent.*;
import java.util.*;

public class JBWatcherManagerTest {

  JBWatcherManager manager;
  JBWatcher watcher;

  @Before 
  public void initializeManager() {
    manager = JBWatcherManager.getInstance();  
    watcher = new JBWatcher("test-JBId");
  }
  
  @Test
  public void testAddWatcherActiveWatcher() {
    assertFalse(manager.isWatcherActive(watcher));
    manager.addWatcher(watcher);
    assertTrue(manager.isWatcherActive(watcher));
  }
  
  @Test
  public void testAddWatcherSettingWatcherHandle() {
    assertNull(watcher.getWatcherHandle());
    manager.addWatcher(watcher);
    assertNotNull(watcher.getWatcherHandle());
  }

  @After
  public void cleanUp(){
    if (manager.isWatcherActive(watcher)) {
      manager.killWatcher(watcher);
    }
    manager = null;
    watcher = null;
  }

}
