
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

Sys:Printf(text)
```
2. Person object:
```
val age = "15"

object Man {
	field name
	field age
	field wife

	method Info() {
		Sys:Printf("$(0) is $(1) years old and his wife's name is $(2).", name, age, wife)
	}
}

object Woman {
	field name
	field age
	field husband

	method Info() {
		Sys:Printf("$(0) is $(1) years old and her husband's name is $(2).", name, age, husband)
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
	Sys:Printf("$(0) is a gay.", person)
 }

 printGay("nigger")
```
4. If conditions
```
val to_true = "1234"

if to_true {
	Sys:Printf("this is true")
	return 
}

Sys:Printf("this is false")
```

=======
# TODO:
none :D
---
### This is the end!
