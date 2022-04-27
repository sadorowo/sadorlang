method WyswietlZasadyProgramisty() {
    Sys:Printf("1. Gdy lud czegoś nie rozumie to niech udaje że rozumie.")
    Sys:Printf("2. Gdy wnerwisz się na swój kod to go usuń albo zażyj meliske i się uspokój.")
    Sys:Printf("3. Niech inni doceniają Twoje starania.")

    return "Wyświetlono!"
}

object Chlopak {
    field imie
    field wiek

    method Informacje(dziewczyna) {
        Sys:Printf("$(0) ma $(1) lat i jego dziewczyna nazywa sie $(2).", imie, wiek, dziewczyna)
    }
}

object Dziewczyna {
    field imie
    field wiek

    method Informacje(chlopak) {
        Sys:Printf("$(0) ma $(1) lat i jej chlopak nazywa sie $(2).", imie, wiek, chlopak)
    }
}

object Zakupy {
    method Naleznosc(produkty) {
        val naleznosc = Random:Int(30, 60)
        return Sys:Fmt("Za produkty: $(0) musisz zapłacić $(1)zł.", produkty, naleznosc)
    }
}