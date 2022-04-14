include "help"

# hello
# to jest komentarz

val mut test = "12333"

Console:Println("123", "456", "456", test)

method sador(sadorowo, abcd) {
    Console:Println(sadorowo, abcd)
}

object Sador {
    field hello
    field name
    field abc

    method New(sador) {
        Console:Println("hello world", sador)
    }
}

val sadores = Sador("1", "2", "3")
sadores:New("sador is here")