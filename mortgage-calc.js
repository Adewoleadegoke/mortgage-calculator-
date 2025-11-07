const  radioInputs = document.querySelectorAll('.radio-input');
const firstRadioDiv = document.getElementById('first-radio-div')
const mortgageAmount = document.getElementById('mortgage-amt')
var poundHolder = document.getElementById('pound-holder')
var mortgageYears = document.getElementById('mortgage-yrs');
var rate = document.getElementById('rate');
var placeHolderTwo = document.getElementById('spantwo')
var placeHolderThree = document.getElementById('spanthree')



//Code for Radio Input
radioInputs.forEach(function(radioInput) {
    radioInput.addEventListener('click', function() {
        // Reset all
        var allRadioDivs = document.querySelectorAll('.radio-div');
        allRadioDivs.forEach(function(div) {
            div.style.borderColor = '';
            // Also reset any label or text elements inside
            div.style.backgroundColor = ''           
        });
        
        document.getElementById('error-radio').classList.add('hidden')
        // Apply to clicked one
        var parentDiv = this.closest('.radio-div');
        if (parentDiv) {
            parentDiv.style.borderColor = 'var(--lime)';
            parentDiv.style.backgroundColor = 'var(--lightlime)';                     
        }
    });
});


//Code for Number Input Interactivity
mortgageAmount.addEventListener('focus', function () {    
    poundHolder.style.backgroundColor = 'var(--lime)';
    poundHolder.style.color = 'var(--darkest-blue)';
    document.getElementById('error-amt').classList.add('hidden');
     mortgageAmount.classList.remove('error-input-border');    
})
mortgageAmount.addEventListener('blur', function () {
    poundHolder.style.color = '';
    poundHolder.style.backgroundColor = '';
    
})

mortgageYears.addEventListener('focus', function () {
    
     placeHolderTwo.style.backgroundColor = 'var(--lime)';
     placeHolderTwo.style.color = 'var(--darkest-blue)';
     document.getElementById('error-yrs').classList.add('hidden');
     mortgageYears.classList.remove('error-input-border');
})
mortgageYears.addEventListener('blur', function () {  
     placeHolderTwo.style.backgroundColor = '';
     placeHolderTwo.style.color = '';
})

rate.addEventListener('focus', function () {
    
     placeHolderThree.style.backgroundColor = 'var(--lime)';
     placeHolderThree.style.color = 'var(--darkest-blue)';
     document.getElementById('error-rate').classList.add('hidden');
        rate.classList.remove('error-input-border');
})
rate.addEventListener('blur', function () {  
     placeHolderThree.style.backgroundColor = '';
     placeHolderThree.style.color = '';
})


//M = P [ r(1+r)^n ] / [ (1+r)^n - 1 ](Formula for mortgage in the repayment option)

//Code for Calculation of Repayment(First Option)
var mortgageYears = document.getElementById('mortgage-yrs');
var rate = document.getElementById('rate');
var repaymentOption = document.getElementById('repayment-option');
var interestOption = document.getElementById('interest-option')


function repaymentFormula() {

    var principal = parseFloat(mortgageAmount.value);
    var years = parseFloat(mortgageYears.value);
    var annualRate = parseFloat(rate.value);

    var monthlyRate = annualRate / 100 / 12 ;
    var numberOfPayments = years * 12 ;


    var a = Math.pow(1+monthlyRate, numberOfPayments);   
    var monthlyPayment = principal * (monthlyRate * a) / (a - 1)
    
    return monthlyPayment;
}
//End of code for formula

//Code for Interest Only(second option)
function interestOnlyFormula () {
    var principal = parseFloat(mortgageAmount.value);
    var years = parseFloat(mortgageYears.value);
    var annualRate = parseFloat(rate.value);

    var monthlyRate = annualRate / 100 ;
    var numberOfPayments = years * 12 ;
    
    var monthlyInterestPayment = (principal * monthlyRate) / 12;
    
    return monthlyInterestPayment;
}



//Code for button interaction
const calcButton = document.getElementById('calc-btn');

calcButton.addEventListener('click', function () {
        var monthlyRepayInput = document.getElementById('monthly-repay');
        var totalRepayInput = document.getElementById('total-repay');
 
  //Repayment Input  
    var repayInput = repaymentOption.checked;
    var interestInput = interestOption.checked;
    var years = parseFloat(mortgageYears.value);
    var principal = parseFloat(mortgageAmount.value);
    var numberOfPayments = years * 12 ;
    
    var annualRate = parseFloat(rate.value);
    
    let principalValue = mortgageAmount.value.trim();
    let yearsValue = mortgageYears.value.trim();
    let annualRateValue = rate.value.trim();
        
    //repayment input
    var calcWriteup = document.getElementById('calc-writeup');
   var calcResults = document.getElementById('calc-results');
    
    
    if (principalValue === "" && yearsValue === "" && annualRateValue === "" && !repayInput && !interestInput){
        
        document.getElementById('error-amt').classList.remove('hidden');
     poundHolder.style.backgroundColor = 'var(--red)';
     poundHolder.style.color = 'white';
     mortgageAmount.classList.add('error-input-border');    
     document.getElementById('error-yrs').classList.remove('hidden')
        placeHolderTwo.style.backgroundColor = 'var(--red)';
        placeHolderTwo.style.color = 'white';
        mortgageYears.classList.add('error-input-border');
        document.getElementById('error-rate').classList.remove('hidden');
        placeHolderThree.style.backgroundColor = 'var(--red)';
        placeHolderThree.style.color = 'white';
        rate.classList.add('error-input-border');
       
        document.getElementById('error-radio').classList.remove('hidden');
               
    }else if(principalValue === "") {
               document.getElementById('error-amt').classList.remove('hidden');
     poundHolder.style.backgroundColor = 'var(--red)';
     poundHolder.style.color = 'white';
     mortgageAmount.classList.add('error-input-border');    
             
    } else if(yearsValue === "") {
        document.getElementById('error-yrs').classList.remove('hidden')
        placeHolderTwo.style.backgroundColor = 'var(--red)';
        placeHolderTwo.style.color = 'white';
        mortgageYears.classList.add('error-input-border');
        
    }else if(annualRateValue === "") {
        document.getElementById('error-rate').classList.remove('hidden');
        placeHolderThree.style.backgroundColor = 'var(--red)';
        placeHolderThree.style.color = 'white';
        rate.classList.add('error-input-border');
        
    }else  if(!repayInput && !interestInput) {
        
        document.getElementById('error-radio').classList.remove('hidden');
        
    }else if (repayInput) {
        let repayFormInput = repaymentFormula();
        let totalRepayment = repayFormInput * (years * 12);         
                
        monthlyRepayInput.textContent = '£' + Math.round(repayFormInput * 100) / 100;
        totalRepayInput.textContent = '£' + Math.round(totalRepayment * 100) / 100;
        calcWriteup.classList.add('hidden');
   calcResults.classList.remove('hidden');
   
    } else if (interestInput) {
        
        let monthlyInterestPayment = interestOnlyFormula();
        var totalInterestPayment = principal + (monthlyInterestPayment * numberOfPayments)
        
        monthlyRepayInput.textContent = '£' + Math.round(monthlyInterestPayment * 100)/100;
        totalRepayInput.textContent = '£' + Math.round(totalInterestPayment * 100)/100;
        
        calcWriteup.classList.add('hidden');
   calcResults.classList.remove('hidden');
    }
   
})

const clearButton = document.getElementById('clear');

clearButton.addEventListener('click', function () {
  var calcWriteup = document.getElementById('calc-writeup');
   var calcResults = document.getElementById('calc-results');


    mortgageAmount.value = null;
    mortgageYears.value = null;
    rate.value = null;
    repaymentOption.checked = false;
    interestOption.checked = false;
    
    var allRadioDivs = document.querySelectorAll('.radio-div');
        allRadioDivs.forEach(function(div) {
            div.style.borderColor = '';
            // Also reset any label or text elements inside
            div.style.backgroundColor = ''           
        });
    
    calcWriteup.classList.remove('hidden');
   calcResults.classList.add('hidden');
})







    