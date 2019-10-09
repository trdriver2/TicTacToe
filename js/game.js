class Board{
    constructor(){
        this.board=new Array(9)
        this.player='X'
        this.turn=0;
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
            return ""   
        }
        if(this.board[space]!== "N")
        {
            console.log("That space is allready taken by", this.board[space], ",\npick another")
            return ""
        }

        this.board[space]=this.player
        if(this.player=='X')
            this.player='O'
        else
            this.player='X'
        this.turn++;
        return this.board[space];
    }

    check(space)
    {
         //something horizontal
        let temp = space-(space%3)
        if(this.board[temp] === this.board[space] && this.board[temp] === this.board[temp+1] && this.board[temp] === this.board[temp+2])
            return true;

        //something verticle
        temp = space - temp
        if(this.board[temp] === this.board[space] && this.board[temp] === this.board[temp+3] && this.board[temp] === this.board[temp+6])
            return true;
        
        if(space%2===0)
        {
            if(space === 0 || space === 8 || space ===4)
            {
                if(this.board[0] === this.board[space] && this.board[0] === this.board[4] && this.board[0] === this.board[8])
                    return true;
                /*else if(space != 4)
                    return false*/
            }

            if(space === 2 || space === 6 || space ===4)
            {
                if(this.board[2] === this.board[space] && this.board[2] === this.board[4] && this.board[2] === this.board[6])
                    return true;
            }
        }

        if(this.turn===9)
            return "tie"
        return false
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

    reset()
    {
        for(i=0;i<this.board.length;i++)
            this.board[i]='N'
        this.turn=0;
    }
}

let b = new Board()

const {question} = require('readline-sync')

/*for(i=0, win=false; !win && i<9; i++)
{   
    while(!win)
    {
        num = parseInt(question("Please enter a number"))
        test = b.place(num)
        b.printBoard()
        win=b.check(num)
        console.log(win)
    }
}*/

function place(pos)
{
    let buttons = document.getElementsByTagName('button')
    player=b.place(pos)
    if(player!="")
        buttons[pos].innerHTML=player;

    win = b.check(pos);
    if(win || win ==="tie")
    {
        if(win!="tie")
            setTimeout(window.alert(player + " wins"), 50)
        else
            setTimeout(window.alert("Tie"), 50)
        for(i=0;i<buttons.length;i++)
            buttons[i].innerHTML="";
        b.reset()
    }
}

