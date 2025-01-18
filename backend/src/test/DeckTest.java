package test;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import model.Deck;

public class DeckTest {
    
    public Deck instance1;
    public Deck instance2;

    // Gets the instance of the Deck class, or creates a new one if it hasn't been initialized yet. 
    @Before
    public void initialize() {
        instance1 = Deck.getInstance();
        instance2 = Deck.getInstance();
    }

    // Check to make sure the singleton is working 
    @Test
    public void singletonTest() {
        assertEquals(instance1, instance2);
    }
    
}
