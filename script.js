

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  
    movementsDates: [
      '2019-11-18T21:31:17.178Z',
      '2019-12-23T07:42:02.383Z',
      '2020-01-28T09:15:04.904Z',
      '2020-04-01T10:17:24.185Z',
      '2020-05-08T14:11:59.604Z',
      '2020-05-27T17:01:17.194Z',
      '2020-07-11T23:36:17.929Z',
      '2022-09-23T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  
    movementsDates: [
      '2019-11-01T13:15:33.035Z',
      '2019-11-30T09:48:16.867Z',
      '2019-12-25T06:04:23.907Z',
      '2020-01-25T14:18:46.235Z',
      '2020-02-05T16:33:06.386Z',
      '2020-04-10T14:43:26.374Z',
      '2020-06-25T18:49:59.371Z',
      '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
  };
  
  const accounts = [account1, account2];



// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function(date, locale){
    const calcDaysPassed = (date1, date2)=> Math.round(Math.abs(date2-date1)/(1000*60*60*24))
    const daysPassed = calcDaysPassed(new Date(), date)
    console.log("days passed", daysPassed)
        if(daysPassed === 0) return 'Today'
        if(daysPassed === 1) return 'Yesterday'
        if(daysPassed <= 7) return `${daysPassed} days ago`
        //     const day = `${date.getDate()}`.padStart(2,0)
        //     const month =`${date.getMonth() + 1}`.padStart(2,0)
        //     const year = date.getFullYear()
        // //     const hour = `${now.getHours()}`
        // //    const min = `${now.getMinutes()}`
        //     return `${day}/${month}/${year} `
        return new Intl.DateTimeFormat(locale).format(date)
      
    
}
const formatCurrency = function(value, locale, currency){
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency:currency,
    }).format(value)
//instead of
// const formattedMov = new Intl.NumberFormat(acc.locale, {
//     style: 'currency',
//     currency: acc.currency,
// }).format(mov)
}
const displayMovements = function(acc, sort = false){
    containerMovements.innerHTML = ''//.textcontent is zero
    console.log("acc movements", acc.movements)
    const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements
    movs.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdrawal'
        const date = new Date(acc.movementsDates[i])
        const displayDate = formatMovementDate(date, acc.locale)

        const formattedMov = formatCurrency(mov, acc.locale, acc.currency)

        let html = `
          <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class = "movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div> 
          </div>
          `;
         // console.log(type, i);
          containerMovements.insertAdjacentHTML('afterbegin', html)
         // console.log( containerMovements.insertAdjacentHTML('afterbegin', html))
    });
    //<div class="movements__value">${mov.toFixed(2)}</div>
    };
//displayMovements(account1.movements)
const calcDisplayBalance = function(acc){
     acc.balance = acc.movements.reduce((acc,mov) => acc + mov, 0)
    //acc.balance = balance same as acc.balance

    labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency)
}
//calcDisplayBalance(account1.movements)


calcDisplaySummary = function(acc){
    const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc,mov) => acc + mov, 0)
    labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency)

    const out = acc.movements.filter(mov => mov < 0)
    .reduce((acc, mov)=> acc + mov, 0)
    labelSumOut.textContent = formatCurrency(Math.abs(out), acc.locale, acc.currency)

    const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate)/100)
    .filter((int, i, arr)=> {
        return int >= 1;
    })
    .reduce((acc, int)=> acc + int, 0)
    labelSumInterest.textContent = formatCurrency(interest, acc.locale, acc.currency)
}
//calcDisplaySummary(account1.movements)

const createUsernames = function (accs){
    accs.forEach(function (acc){
        acc.userName = acc.owner.toLowerCase().split(' ').map(function(name){
            return name[0]
        })
        .join('')

    })
}
createUsernames(accounts)
//console.log(accounts)

const updateUI = function(acc){
       //Display movements
       displayMovements(acc)
       //Display Balance
       calcDisplayBalance(acc)
       //Display Summary
       calcDisplaySummary(acc)
}

const startLogOutTimer = function () {
    const tick = function(){
        const min = String(Math.trunc(time / 60)).padStart(2, 0)
        const sec = String(time % 60).padStart(2,0)
        //In each call, print the remaining time to UI
        labelTimer.textContent = `${min}: ${sec}`
      
        //WHen 0 seconds stop timer and log out user
        if(time === 0){
        clearInterval(timer)
        labelWelcome.textContent = 'log in to get started'
        containerApp.style.opacity = 0
        }
          //Decrease 1 second
          time--
    
    }
    let time = 120
    //call timer every second
    tick()
    const timer = setInterval(tick, 1000)
    return timer
    console.log("timer", timer)
}
//for event handlers
let currentAccount, timer
// //always logged in 
// currentAccount=account1
// updateUI(currentAccount)
// containerApp.style.opacity = 100


// labelDate.textContent = now
//int api



// const day = `${now.getDate()}`.padStart(2,0)
// const month =`${now.getMonth() + 1}`.padStart(2,0)
// const year = now.getFullYear()
// const hour = `${now.getHours()}`.padStart(2,0)
// const min = `${now.getMinutes()}`.padStart(2,0)
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`

btnLogin.addEventListener('click', function(e){
    //prevent form from submitting
    e.preventDefault()
    console.log('LOGIN')
    currentAccount = accounts.find(acc=> acc.userName === inputLoginUsername.value)
    
//if(currentAccount && currentAccount.pin === Number(inputLoginPin.value)){
    if(currentAccount?.pin === Number(inputLoginPin.value)){
       // console.log('LOGIN')
        //DisplayUi and message
        labelWelcome.textContent = `Welcome Back ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 100;
        const now = new Date()
    const options = {
    hour: 'numeric',
    minute: 'numeric',
    day:'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
}
labelDate.textContent = new Intl.DateTimeFormat('en-us', options).format(now)
        //clear the input fields
        inputLoginUsername.value = inputLoginPin.value  = ''//assignment operator works from right to left
        //inputClosePin.value  = '' hence, inputLoginUsername = ''
        inputLoginPin.blur()
        //timer
        if(timer) clearInterval(timer)
        timer = startLogOutTimer()
        
     updateUI(currentAccount)
    }
   // console.log("this is currentAccount", currentAccount)
})

btnTransfer.addEventListener('click', function(e){
    e.preventDefault()
    const amount = Number(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc=> acc.userName === inputTransferTo.value)
    console.log(amount, receiverAcc)

    inputTransferAmount.value = inputTransferTo.value = '';

    if(amount > 0 && 
        receiverAcc && 
        currentAccount.balance >= amount && receiverAcc?.userName !== currentAccount.userName ) {
            console.log('Tranfer Valid')
            //doing the tranfer
            currentAccount.movements.push(-amount)
            receiverAcc.movements.push(amount)
            //Add the date
            currentAccount.movementsDates.push(new Date().toISOString())
            receiverAcc.movements.push(new Date().toISOString())
            //update UI
            updateUI(currentAccount)
            //reset timer
            clearInterval(timer)
            timer = startLogOutTimer()
        }
})

btnLoan.addEventListener('click', function(e){
    e.preventDefault()
    const amount =  Number(inputLoanAmount.value)

    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
        setTimeout(function(){

             //Add movement
        currentAccount.movements.push(amount)

        //add loan
        currentAccount.movementsDates.push(new Date().toISOString())
        updateUI(currentAccount)
        clearInterval(timer)
        timer = startLogOutTimer()

        }, 2000)
    }
    inputLoanAmount.value = ''
})

btnClose.addEventListener('click', function(e){
    e.preventDefault()
    if(inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin){
        const index = accounts.findIndex((acc => acc.userName === currentAccount.userName))
        //delete account
        accounts.splice(index, 1)//splice mutates the underlying arrays
        //hide UI
        containerApp.style.opacity = 0
    }
    inputCloseUsername.value = inputClosePin.value = ''
})

let sorted = false
btnSort.addEventListener('click', function(e){
    e.preventDefault()
    displayMovements(currentAccount.movements, !sorted)
    sorted = !sorted
})
//console.log(containerMovements.innerHTML)
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function(mov){
    return mov > 0
 })
 console.log(movements)
 console.log(deposits)
 //  const depositsFor = []
//  for(const mov of movements)
//  if (mov > 0){
//     depositsFor.push(mov)
//  }
//  console.log("depositsForforloop",depositsFor)
/////////////////////////////////////////////////
const withdrawals = movements.filter(function(mov){
    return mov < 0
})
console.group(withdrawals)
const balance = movements.reduce((acc, cur, i, arr)=>acc + cur
    // console.log(`Iteration${i} : ${acc} `)
     
, 0)
console.log(balance)

const humanAgeCalc = function(ages){
    const humanAges = ages.map(age => age <= 2 ? 2*age : 16 + age * 4)
}

const sums = accounts.flatMap(acc=> acc.movements)
            .reduce((sums, cur)=> {
            //     cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur)
            //     return sums
            sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur
            return sums
            }, {deposits:0, withdrawals:0}
            
            )
            console.log(sums)


const ingredient = ['pizza', 'cheese']
const pizzaOrder = setTimeout((ing1, ing2)=> console.log(`Here is your pizza with ${ing1} and ${ing2} `), 2000, ...ingredient)
console.log('....waiting')
if(ingredient.includes(' as')) clearTimeout(pizzaOrder)

// setInterval(function(){
//     const now = new Date()
//     console.log(now)
// })