package life.jukebox.yoda;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import java.util.concurent.*;
import java.util.*;

public class JBWatcherManagerTest extends TestCase {
  
  public JBWatcherManagerTest( String testName )
  {
    super( testName );
  }
  @before 
  public void initializeManager() {
    JBWatcherManeger manager = JBWatcherManager.getInstance();  
    JBWatcher watcher = new JBWatcher("test-JBId");
  }
  
  @Test
  public void testAddWatcherActiveWatcher() {
    assertFalse(manager.isWatcherActive(watcher));
    manager.addWatcher(watcher);
    assertTrue(manager.isWatcherActive(watcher));
  }
  
  @Test
  public void testAddWatcherSettingWatcherHandle(watcher) {
    assertNull(watcher.getWatcherHandle(watcher));
    manager.addWatcher(watcher);
    assertNotNull(watcher.getWactherHandle(watcher));
  }

  @after
  public void cleanUp(){
    if (manager.isWatcherActive(watcher)) {
      manager.killWatcher(watcher);
    }
    manager = null;
    watcher = null;
  }

}
