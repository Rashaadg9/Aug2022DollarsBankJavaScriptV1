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
    }
}
const transactions = [ new Transaction(1, "deposit", 100.00), new Transaction(2, "deposit", 200.00), new Transaction(1, "deposit", 100.05) ];
let user = new User(1, "Rashaad", "Gray", "rgray", "password", "0123", 200.05);
console.log("DOLLARSBANK ATM WELCOMES YOU!!!");
loginMenu();
main();

function main()
{
    let option = 0;
    console.log("Welcome ", user.firstName)
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

function loginMenu()
{
    var loggedIn = false;

    while (loggedIn != true)
    {
        console.log("1) login");
        console.log("2) Exit");
        option = prompt("Choice: ");

        switch (option)
        {
            case "1":
                loggedIn = true;
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

function mainMenu()
{
    console.log("1) Check Balance");
    console.log("2) Print Transactions");
    console.log("3) Update PIN");
    console.log("4) Withdraw Amount");
    console.log("5) Deposit Amount");
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
    }
}

function pinUpdate()
{
    var current = prompt("Enter current PIN: ");
    if (current == user.pin)
    {
        const regEx = /^\d\d\d\d$/;
        var newPin = prompt("Enter new PIN: ");
        console.log(newPin.search(regEx));
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
    transactions.forEach(t => {
        if(t.id == user.id )
        {
            console.log("Category:", t.type, "Amount: $" + t.amount)
        }
    });
}