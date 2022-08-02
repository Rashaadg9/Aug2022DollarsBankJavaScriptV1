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
const transactions = [ new Transaction(1, "deposit", 100.00) ];
const users = [new User(1, "Rashaad", "Gray", "rgray", "password", "0123", 100.00) ];
let user = new User();
let loggedIn = false;
console.log("DOLLARSBANK ATM WELCOMES YOU!!!");
startMenu();
main();

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
        option = prompt("Choice: ");

        switch (option)
        {
            case "1":
                console.log("Your current balance: $" + user.cash);
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
            case "E":
            case "e":
                run = false;
                break;
            default:
                console.log("... invalid option ...");
        }
    }
    console.log("... Exiting System ...");
}

function startMenu()
{

    while (loggedIn != true)
    {
        console.log("1) login");
        console.log("2) Exit");
        option = prompt("Choice: ");

        switch (option)
        {
            case "1":
                logInMenu();
                break;
            case "2":
                run = false
                loggedIn = true;
                break;
            default:
                //
        }
    }

}

function logInMenu()
{
    var count = 0;
    userName = prompt("Enter username: ");
    users.forEach(u => {
        if(u.userName == userName )
        {
            userPassword = prompt("Enter password: ");
            count = 1;
            if (userPassword == u.password)
            {
                loggedIn = true;
                setUser(u.id);
                return;
            }
            else
            {
                console.log("Incorrect Password!!");
            }
        }
    });
    if (count == 0)
    {
        console.log("Incorrect username!!");
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
    console.log("1) Check Balance");
    console.log("2) Print 5 recent Transactions");
    console.log("3) Update PIN");
    console.log("4) Withdraw Amount");
    console.log("5) Deposit Amount");
    console.log("6) Display Account Information");
    console.log("E) Exit");
}

function deposit()
{
    var newDeposit = parseFloat(prompt("Amount to deposit: $"));
    if (newDeposit < 1.00 )
    {
        console.log("Deposit can't be less than $1.00");
    }
    else
    {
        user.cash += newDeposit;
        console.log("Your new balance is: $" + user.cash);
        updateTransactions("deposit", newDeposit);
    }
}

function withdraw()
{
    var amount = parseFloat(prompt("Amount to withdraw: $"));
    if (amount > user.cash )
    {
        console.log("withdraw can't be more than whats in account ($" + user.cash + ")");
    }
    else
    {
        user.cash -= amount;
        console.log("Your new balance is: $" + user.cash);
        updateTransactions("withdraw", amount);
    }
}

function pinUpdate()
{
    var current = prompt("Enter current PIN: ");
    if (current == user.pin)
    {
        const regEx = /^\d\d\d\d$/;
        var newPin = prompt("Enter new PIN: ");
        if (newPin.search(regEx) == 0)
        {
            user.pin = newPin;
            console.log("Pin update successful!");
        }
        else
        {
            console.log("Invalid format must match be 4-digit pin (ex. 0589)");
        }
    }
    else
    {
        console.log("INVALID PIN!!!");
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
            console.log("TimeStamp: " + t[i].date, "| Category:", t[i].type, " | Amount: $" + t[i].amount);
            if (count >= 5)
            {
                return;
            }
        }
    }
}

function updateTransactions(type, amount)
{
    transactions.push(new Transaction(user.id, type, amount));
}

function accInfo()
{
    console.log("First Name:", user.firstName)
    console.log("Last Name: ", user.lastName)
    console.log("Username:  ", userName)
    console.log("PIN:       ", user.pin)
    console.log("Balance:   ", user.cash)
}