
# SadorLang  
  
New "programming language" created 4FUN by Sador. **AKA** cfs.  
  
How to run sadorlang?  
- Clone this repository:  
```bash  
git clone https://github.com/sadorowo/sadorlang  
```  
  
- Write first sadorlang file. Examples in the end.  
- Save file.  
- Use this command in order to enable executing sadorlang file (MUST BE ROOT):  
  
 1. Linux:
```bash  
sudo chmod +x ./sl.sh  
```  
2. Windows:
*you don't need any commands right here :)*
  
- Run your sadorlang file:  
 1. Linux:
 ```sh
 ./sl.sh run <filename>.sl
 ```
 2. Windows:
 ```cmd
 sl run <filename>.sl
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

val sador = Man("Sador", "15", "none")
sador:Info() // Sador is 15 years old and his wife's name is none.

val thatGirl = Woman("ThatOneGirl", "???", "sador (in future)")
thatGirl:Info() // ThatOneGirl is ??? years old and her husband's name is sador (in future).
```
 3.  Functions
 ```
 method printGay(person) {
	 Console:Println(person, " is a gay.")
 }

 printGay("nigger")
 ```

# TODO:
- Support for object method arguments
- Modules/imports
- Changing variable value
---
### This is the end!