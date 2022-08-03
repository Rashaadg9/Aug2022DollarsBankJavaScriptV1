const prompt = require("prompt-sync")();
let run = true;
class User
{
    constructor(id, firstName, lastName, userName, password, pin, cash)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.pin = pin;
        this.cash = cash;
    }
}
class Transaction
{
    constructor(id, type, amount)
    {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.date = new Date();
        
    }
}

const Color =
{
    red: '\033[31;1m',
    green: '\033[32;1m',
    blue: '\033[34m',
    yellow: '\033[33m',
    magenta: '\033[35m',
    cyan: '\033[36m',
    white: '\033[37;1m',
    whiteBackground: '\033[47;1m',
    reset: '\033[0m'
};

const transactions = [ new Transaction(1, "deposit   ", 100.00), new Transaction(2, "deposit   ", 200.00) ];
const users = [new User(1, "Rashaad", "Gray", "rgray", "password", "0123", 100.00), new User(2, "John", "Doe", "jdoe", "pass", "1234", 200.00) ];
let user = new User();
let loggedIn = false;
console.log(Color.blue + "DOLLARSBANK ATM WELCOMES YOU!!!" + Color.reset);
startMenu();

function main()
{
    let option = 0;
    if (user.id != undefined)
    {
        console.log("Welcome ", user.firstName)
    }

    while(run == true)
    {
        mainMenu();
        option = prompt(Color.blue + "Choice: " + Color.yellow);
        console.log(Color.reset);

        switch (option)
        {
            case "1":
                console.log("Your current balance: " + Color.green + "$" + Color.blue + user.cash);
                break;
            case "2":
                printTransactions();
                break;
            case "3":
                pinUpdate();
                break;
            case "4":
                withdraw();
                break;
            case "5":
                deposit();
                break;
            case "6":
                accInfo();
                break;
            case "7":
                transferFunds();
                break;
            case "X":
            case "x":
                run = false;
                user = new User();
                loggedIn = false;
                console.log(Color.whiteBackground + Color.green + "... Signing Out ..." + Color.reset);
                break;
            default:
                console.log("... invalid option ...");
        }
    }
}

function startMenu()
{
    let exit = false;
    while (exit == false)
    {
        while (loggedIn != true)
        {
            console.log(Color.yellow + "1" + Color.red + ")" + Color.cyan + " login");
            console.log(Color.yellow + "2" + Color.red + ")" + Color.cyan + " SignUp");
            console.log(Color.yellow + "3" + Color.red + ")" + Color.cyan + " Exit");
            option = prompt(Color.blue + "Choice: " + Color.yellow);
            console.log(Color.reset);

            switch (option)
            {
            case "1":
                logInMenu();
                break;
            case "2":
                SignUpMenu();
                break;
            case "3":
                run = false
                loggedIn = true;
                exit = true;
                break;
            default:
                //
        }
        }
        main();
    }
    console.log(Color.whiteBackground + Color.green + "... Exiting System ..." + Color.reset);

}

function logInMenu()
{
    var count = 0;
    userName = prompt(Color.magenta + "Enter username: " + Color.reset);
    users.forEach(u => {
        if(u.userName == userName )
        {
            userPassword = prompt(Color.magenta + "Enter password: " + Color.reset);
            count = 1;
            if (userPassword == u.password)
            {
                loggedIn = true;
                setUser(u.id);
                run = true;
                return;
            }
            else
            {
                console.log(Color.red + "Incorrect Password!!" + Color.reset);
            }
        }
    });
    if (count == 0)
    {
        console.log(Color.red + "Incorrect username!!" + Color.reset);
    }
}

function setUser(id)
{
    users.forEach(u => {
        if(u.id == id)
        {
            user = u;
        }
    });
}

function mainMenu()
{
    console.log(Color.yellow + "1" + Color.red + ")" + Color.cyan + " Check Balance");
    console.log(Color.yellow + "2" + Color.red + ")" + Color.cyan + " Print 5 recent Transactions");
    console.log(Color.yellow + "3" + Color.red + ")" + Color.cyan + " Update PIN");
    console.log(Color.yellow + "4" + Color.red + ")" + Color.cyan + " Withdraw Amount");
    console.log(Color.yellow + "5" + Color.red + ")" + Color.cyan + " Deposit Amount");
    console.log(Color.yellow + "6" + Color.red + ")" + Color.cyan + " Display Account Information");
    console.log(Color.yellow + "7" + Color.red + ")" + Color.cyan + " Transfer Funds");
    console.log(Color.yellow + "X" + Color.red + ")" + Color.cyan + " LogOut");
}

function deposit()
{
    var newDeposit = parseFloat(prompt(Color.magenta + "Amount to deposit: " + Color.green + "$" + Color.blue));
    if (newDeposit < 1.00 || isNaN(newDeposit) == true)
    {
        console.log(Color.red + "Deposit can't be less than $1.00");
    }
    else
    {
        user.cash += newDeposit;
        console.log(Color.reset + "Your new balance is: " + Color.green + "$" + Color.blue + user.cash);
        updateTransactions(user.id, "deposit   ", newDeposit);
    }
}

function withdraw()
{
    var amount = parseFloat(prompt(Color.magenta + "Amount to withdraw: " + Color.green + "$" + Color.blue));
    if (amount > user.cash || amount < 0.00 || isNaN(amount) == true)
    {
        console.log(Color.red + "withdraw can't be more than whats in account (" + Color.green + "$" + Color.blue + user.cash + Color.red + ") or Negative");
    }
    else
    {
        user.cash -= amount;
        console.log("Your new balance is: " + Color.green + "$" + Color.blue + user.cash);
        updateTransactions(user.id, "withdraw  ", amount);
    }
}

function pinUpdate()
{
    var current = prompt(Color.magenta + "Enter current PIN: " + Color.reset);
    if (current == user.pin)
    {
        const regEx = /^\d\d\d\d$/;
        var newPin = prompt(Color.magenta + "Enter new PIN: " + Color.reset);
        if (newPin.search(regEx) == 0)
        {
            user.pin = newPin;
            console.log("Pin update " + Color.green + "successful" + Color.reset + "!!!");
        }
        else
        {
            console.log(Color.red + "Invalid format must match be 4-digit pin (ex. 0589)" + Color.reset);
        }
    }
    else
    {
        console.log(Color.red + "INVALID PIN!!!" + Color.reset);
    }
}

function printTransactions()
{
    var count = 0;
    const t = transactions.slice().reverse();
    for (let i = 0; i < t.length; i++)
    {
        if (t[i].id == user.id)
        {
            count += 1;
            console.log(Color.white + "TimeStamp: " + Color.blue + t[i].date, Color.yellow + 
            "|" + Color.white + " Category:", Color.blue + t[i].type, Color.yellow + "|" + Color.white + " Amount: " + Color.green + "$" + Color.blue + t[i].amount);
            if (count >= 5)
            {
                return;
            }
        }
    }
}

function updateTransactions(id, type, amount)
{
    transactions.push(new Transaction(id, type, amount));
}

function accInfo()
{
    console.log(Color.magenta + "First Name:" + Color.reset, user.firstName)
    console.log(Color.magenta + "Last Name: " + Color.reset, user.lastName)
    console.log(Color.magenta + "Username:  " + Color.reset, userName)
    console.log(Color.magenta + "PIN:       " + Color.reset, user.pin)
    console.log(Color.magenta + "Balance:   ", Color.green + "$" + Color.blue + user.cash)
}

function transferFunds()
{
    let other =  prompt(Color.magenta + "Username to transfer to: " + Color.reset);
    users.forEach(u => {
        if(u.userName.toLowerCase() == other.toLowerCase())
        {
            var transfer = parseFloat(prompt(Color.magenta + "Amount to transfer: " + Color.green + "$" + Color.blue));
            if (transfer > user.cash  || transfer < 0 || isNaN(transfer) == true)
            {
                console.log(Color.red + "Transfer can't be more than whats in account (" + Color.green +"$" + user.cash + Color.red + ") or Negative");
            }
            else
            {
                user.cash -= transfer;
                u.cash += transfer
                console.log(Color.reset + "Your new balance is: " + Color.green + "$" + Color.blue + user.cash);
                updateTransactions(user.id, "transfered", transfer);
                updateTransactions(u.id, "recived   ", transfer);
            }
        }
    });
}

function SignUpMenu()
{
    let pass = false;
    var firstName =  prompt(Color.magenta + "Enter First Name: " + Color.reset);
    var lastName =  prompt(Color.magenta + "Enter Last Name: " + Color.reset);
    while (pass == false)
    {
        var userName =  prompt(Color.magenta + "Enter username: " + Color.reset);
        pass = true;
        users.forEach((u) => { if(u.userName.toLowerCase() == userName.toLowerCase()){ pass = false;
            console.log("Username (" + userName + ") is already taken") } });
    }
    pass = false;
    const regEx = /^ +$/;
    while (pass == false)
    {
        var password =  prompt(Color.magenta + "Enter password: " + Color.reset);
        if(password == "" || password.search(regEx) == 0)
        {
            console.log("password can't be empty");
        }
        else
            pass = true;
    }
    pass = false;
    pinRegEx = /^\d\d\d\d$/;
    while (pass == false)
    {
        var newPin = prompt(Color.magenta + "Enter 4-digit PIN: " + Color.reset);
        if (newPin.search(pinRegEx) == 0)
        {
            pass = true;
        }
        else
        {
            console.log("Invalid format must be 4-digit pin (ex. 0589)");
        }
    }
    pass = false;
    while (pass == false)
    {
        var newDeposit = parseFloat(prompt(Color.magenta + "Amount to deposit: " + Color.green + "$" + Color.reset));
        if (newDeposit >= 1.00 )
        {
            pass = true;
        }
        else
        {
            console.log("Deposit can't be less than $1.00");
        }
    }
    let newUser = new User((users.slice().reverse()[0].id + 1), firstName, lastName, userName, password, newPin, newDeposit);
    users.push(newUser);
    if (users.slice().reverse()[0].id == newUser.id)
    {
        transactions.push( new Transaction(newUser.id, "deposit   ", newUser.cash) );
        console.log("Account creation " + Color.green + "success" + Color.reset + "!!!");
    }
    else
        console.log("Error creation " + Color.red + "FAILED" + Color.reset + "!!!");
}