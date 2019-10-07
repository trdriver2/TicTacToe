class Board{
    constructor(){
        this.board=new Array(9)
        this.player='X'
        for(let i=0;i<9;i++)
            this.board[i]="N"
    }

    range(value) //A function that makes sure that a certain index is in range
    {
        if(value > 8 || value <0)
            return false
        return true
    }

    place(space)
    {
        if(!this.range(space))
        {
            console.log("The value that you provided is not in range")
            console.log("Please give a value that is 0-8")
            return false   
        }
        if(this.board[space]!== "N")
        {
            console.log("That space is allready taken by", this.board[space], ",\npick another")
            return false
        }

        this.board[space]=this.player
        if(this.player=='X')
            this.player='0'
        else
            this.player='X'

        return true
    }

    check()
    {
        if(space%2 === 0) //check diagonals
        {
            
        }
        
        if((space+1)%3 !== 0) //check right
        {

        }

        if(space%3 !== 0) //check left
        {

        }

        if(space < 6) //check down
        {

        }

        if(space > 2) //check up
        {

        }

    }

    predict()
    {

    }

    printBoard()
    {
        let output="";
        for(let i = 0; i<9; i++)
        {
            output+=this.board[i]+" "
            if((i+1)%3 === 0)
                output+="\n\n"
        }
        console.log(output)
    }
}

let b = new Board()

const {question} = require('readline-sync')

for(i=0; i<9; i++)
{   
    
    let test = false
    while(!test)
    {
        num = parseInt(question("Please enter a number"))
        test = b.place(num)
        b.printBoard()
    }
}