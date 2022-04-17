# hello
# to jest komentarz

val mut test = "12333"

Console:Println("123", "456", "456", test)

method sadorek(s, abcd, abc, def) {
    Console:Println(s, abcd, abc, def)
}

object Man {
	field name
	field age
	field wife

	method Info() {
		Console:Println(name, " is ", age, " years old and his wife's name is ", wife, ".")
	}
}

val sador = Man("Sador", "15", "none")
sador:Info()

sadorek("1", "2", "3", "4")