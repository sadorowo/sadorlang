# to jest komentarz
# druga linia komentarza

object Boy {
    field name
    field age
    field girlfriend

    method DisplayInfo() {
        Console:Println("Informacje o chłopaku o imieniu ", name, ":")
        Console:Println("Imię: ", name)
        Console:Println("Wiek: ", age)
        Console:Println("Imię dziewczyny: ", girlfriend)
    }
}

object Girl {
    field name
    field age
    field boyfriend

    method DisplayInfo() {
        Console:Println("Informacje o dziewczynie :3 o imieniu ", name, ":")
        Console:Println("Imię: ", name)
        Console:Println("Wiek: ", age)
        Console:Println("Imię chłopaka: ", boyfriend)
    }
}

val girlName = "ThatOneGirlInFuture"
val sador = Boy("Sador", "15", girlName)

sador:DisplayInfo()
val girl = Girl("ThatOneGirlInFuture", "unknown", "sador in future")

girl:DisplayInfo()