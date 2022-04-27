# SadorLang

New "programming language" created 4FUN by Sador

How to run SadorLang?

-   Clone this repository:

```bash
git clone https://github.com/sadordev/sadorlang
```

-   Write first SadorLang file. Examples in the end.
-   Save file.
-   Use this command in order to enable executing SadorLang file (MUST BE ROOT):

1.  Linux:

```bash
sudo chmod +x ./sl.bash
```

2. Windows:
   _you don't need any commands right here :)_

-   Run your SadorLang file:

1.  Linux:

```sh
./sl.sh run <filename>.sl
```

2.  Windows:

```cmd
.\sl run <filename>.sl
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

val Sador = Man("Sador", "15", "none")
Sador:Info() // Sador is 15 years old and his wife's name is none.

val thatGirl = Woman("ThatOneGirl", "???", "Sador (in future)")
thatGirl:Info() // ThatOneGirl is ??? years old and her husband's name is Sador (in future).
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
	Sys:Exit()
}

Sys:Printf("this is false")
```

5. Random choice

```
val quotes = { "It's okay, i know someday I'm gonna be with you", "This world can hurt you", "I wanna cry and I wanna love", "are we too young for this?" }

Sys:Printf("sad quote for now: $(0) ;c", Random:Choice(quotes))  
```

# TODO:

## none :D

### This is the end!
