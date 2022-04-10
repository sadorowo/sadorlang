$Import("./tests/static-variables.sl")

each (key % numbers) {
    $Println("$key")
}

each (imie % imiona) {
    def mut val ImieZMalejLitery = $Lower("$imie")
    $Println("Imię z dużej litery: $imie\nImię z małej litery: $ImieZMalejLitery\n")
}