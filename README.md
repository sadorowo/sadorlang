
# cfslang  
  
New "programming language" created 4FUN by cfs.  
  
How to run cfslang?  
- Clone this repository:  
```bash  
git clone https://github.com/cfshere/cfslang  
```  
  
- Write first cfslang file. Examples in the end.  
- Save file.  
- Use this command in order to enable executing cfslang file (MUST BE ROOT):  
  
 1. Linux:
```bash  
sudo chmod +x ./cfsl.sh  
```  
2. Windows:
*you don't need any commands right here :)*
  
- Run your cfslang file:  
 1. Linux:
 ```sh
 ./cfsl.sh run <filename>.cfs
 ```
 2. Windows:
 ```cmd
 cfsl run <filename>.cfs
 ```

## Examples:
1. Hello World:
```
val text = "Hello, World!"

Console:Println(text)
```
2. Person object:
```
val age = "15"

object Man {
	field name
	field age
	field wife

	method Info() {
		Console:Println(name, " is ", age, " years old and his wife's name is ", wife, ".")
	}
}

object Woman {
	field name
	field age
	field husband

	method Info() {
		Console:Println(name, " is ", age, " years old and her husband's name is ", husband, ".")
	}
}

val cfs = Man("cfs", "15", "none")
cfs:Info() // cfs is 15 years old and his wife's name is none.

val thatGirl = Woman("ThatOneGirl", "???", "cfs (in future)")
thatGirl:Info() // ThatOneGirl is ??? years old and her husband's name is cfs (in future).
```
 3.  Functions
 ```
 method printGay(person) {
	 Console:Println(person, " is a gay.")
 }

 printGay("nigger")
 ```

---
### This is the end!