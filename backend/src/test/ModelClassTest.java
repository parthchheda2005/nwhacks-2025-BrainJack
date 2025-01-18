package test;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


// placeholder rename this once we start implementation
public class ModelClassTest {
    @Before
    public void runBefore() {
        System.out.println("true");
    }
    
    @Test
    public void sampleTest() {
        assertTrue(true);
        assertEquals(1, 1);
    }
}
