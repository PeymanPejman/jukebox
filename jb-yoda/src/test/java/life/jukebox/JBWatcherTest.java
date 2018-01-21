package life.jukebox.yoda;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import java.util.concurent.*;
import java.util.*;

public class JBWatcherTest extends TestCase {
  
  private final ByteArrayOutputStream outContent = newArrayOutputStream();
  
  public JBWatcherTest( String testName )
  {
    super( testName );
  }
  @before 
  public void createWather() {
    JBWatcher watcher = new JBWatcher("test-JBId");
    System.setOut(new PrintStream(outContent));
  }

  @Test
  public void testRun() {
    watcher.run();
    assertEquals("Spotify API call to get current playing track", outContent.toString());
  }

  @after
  public void cleanUp(){
    watcher = null;
    System.setOut(System.out);
  }

}
