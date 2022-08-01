const prompt = require("prompt-sync")();
let run = true;
console.log("DOLLARSBANK ATM WELCOMES YOU!!!");
loginMenu();
main();

function main()
{
    let option = 0;
    
    while(run == true)
    {
        mainMenu();
        option = prompt("Choice: ");

        switch (option)
        {
            case "1":
                //
                break;
            case "2":
                //
                break;
            case "3":
                //
                break;
            case "4":
                //
                break;
            case "5":
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