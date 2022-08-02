const prompt = require("prompt-sync")();
let run = true;
class User
{
    constructor(id, firstName, lastName, userName, password, cash)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.cash = cash;
    }
}
let user = new User(1, "Rashaad", "Gray", "rgray", "password", 100.00);
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
                console.log("Transactions TBD");
                break;
            case "3":
                console.log("Update PIN TBD");
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