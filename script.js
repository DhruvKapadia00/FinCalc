// FinCalc - Financial Calculator Script

document.addEventListener('DOMContentLoaded', function() {
    // Get form and result elements
    const calcForm = document.getElementById('calcForm');
    const resultsDiv = document.getElementById('results');
    const dailyReturnElement = document.getElementById('dailyCost');
    const yearlyReturnElement = document.getElementById('yearlyCost');
    const annualizedReturnElement = document.getElementById('annualizedReturn');
    
    // Format for currency display
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    // Bid price input element
    const bidPriceInput = document.getElementById('dollarValue');
    
    // Format the bid price input when it loses focus
    bidPriceInput.addEventListener('blur', function() {
        if (this.value) {
            const value = parseFloat(this.value.replace(/[^\d.-]/g, ''));
            if (!isNaN(value)) {
                this.value = formatter.format(value).replace(/^\$/, '');
            }
        }
    });
    
    // Clear formatting when input gets focus
    bidPriceInput.addEventListener('focus', function() {
        const value = this.value.replace(/[^\d.-]/g, '');
        this.value = value;
    });
    
    // Strike price input element
    const strikePriceInput = document.getElementById('strikePrice');
    
    // Format the strike price input when it loses focus
    strikePriceInput.addEventListener('blur', function() {
        if (this.value) {
            const value = parseFloat(this.value.replace(/[^\d.-]/g, ''));
            if (!isNaN(value)) {
                this.value = formatter.format(value).replace(/^\$/, '');
            }
        }
    });
    
    // Clear formatting when input gets focus
    strikePriceInput.addEventListener('focus', function() {
        const value = this.value.replace(/[^\d.-]/g, '');
        this.value = value;
    });
    
    // Add form submit event listener
    calcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get input values - remove currency formatting for calculation
        const bidPrice = parseFloat(bidPriceInput.value.replace(/[^\d.-]/g, ''));
        const strikePrice = parseFloat(strikePriceInput.value.replace(/[^\d.-]/g, ''));
        const days = parseInt(document.getElementById('days').value);
        
        // Validate inputs
        if (isNaN(bidPrice) || isNaN(strikePrice) || isNaN(days) || 
            bidPrice < 0 || strikePrice <= 0 || days < 1) {
            alert('Please enter valid values for bid price, strike price, and days to expiration.');
            return;
        }
        
        // Calculate returns
        const dailyReturn = bidPrice / days;
        const yearlyReturn = dailyReturn * 365;
        const annualizedReturn = yearlyReturn / strikePrice;
        
        // Update results
        dailyReturnElement.textContent = formatter.format(dailyReturn);
        yearlyReturnElement.textContent = formatter.format(yearlyReturn);
        annualizedReturnElement.textContent = formatter.format(annualizedReturn);
        
        // Show results
        resultsDiv.style.display = 'block';
        
        // Add animation effect to results
        resultsDiv.classList.add('fade-in');
        setTimeout(() => {
            resultsDiv.classList.remove('fade-in');
        }, 500);
    });
    
    // Add input validation for better UX
    const numericInputs = [bidPriceInput, strikePriceInput];
    numericInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Allow only numbers, decimal point, and currency symbols
            this.value = this.value.replace(/[^\d.$,]/g, '');
            
            // Ensure only one decimal point
            const decimalCount = (this.value.match(/\./g) || []).length;
            if (decimalCount > 1) {
                this.value = this.value.slice(0, this.value.lastIndexOf('.'));
            }
        });
    });
    
    // Add keypress event for Enter key
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
            e.preventDefault();
            document.querySelector('.calculate-btn').click();
        }
    });
});
