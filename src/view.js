/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

// Define the store and capture the state object
const { state } = store('create-block', { // Capture state here
  state: {
    scaleFactor: 1,
    // Define derived state for scaled amount
    get scaledAmount() {
      // Get the context for this element
      const context = getContext(); 
      // Check if context and originalAmount exist
      if (typeof context.originalAmount === 'undefined') {
        // No fallback needed now, context should be reliable.
        return ''; // Return empty if context is missing
      }
      // Get originalAmount from context
      const originalAmountString = context.originalAmount;
      const originalAmount = parseFloat(originalAmountString);
      
      // Access global state scaleFactor directly
      const scaleFactor = state.scaleFactor || 1; 

      if (isNaN(originalAmount)) {
        // Return original string from context if not a number
        return originalAmountString;
      }

      const scaledAmount = originalAmount * scaleFactor;

      // Format the number
      if (Number.isInteger(scaledAmount)) {
        return scaledAmount.toString();
      } else {
        // Format to a reasonable number of decimal places, e.g., 2
        // Avoid floating point issues like 0.1 + 0.2
        const rounded = Math.round(scaledAmount * 100) / 100;
        return rounded.toString();
      }
    },
    // Add derived state for button active class
    get isButtonActive() {
      const context = getContext();
      // Check context and scale exist, compare with global state
      // Ensure types match for comparison (context.scale might be string)
      return context?.scale !== undefined && parseFloat(context.scale) === state.scaleFactor;
    }
  },
  actions: {
    // Refactor to use context instead of event/dataset
    setScale: () => { 
      const context = getContext();
      // Check if context and scale exist
      if (!context || typeof context.scale === 'undefined') {
        console.error('Could not get scale from context'); // Keep error log for context issues
        return;
      }
      const scale = parseFloat(context.scale);
      // Check if scale is a valid number
      if (isNaN(scale)) {
         console.error('Invalid scale value in context:', context.scale);
         return;
      }
      // Update captured global state directly
      state.scaleFactor = scale;
    }
  },
  callbacks: {
  },
});