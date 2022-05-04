imionaMeskie := { "Franek" "Kamil" "Mateusz" "Tomek" "Karol" }
imionaZenskie := { "Magda" "Wiktoria" "Karolina" "Ania" }

imiona := shuffle(concat(imionaMeskie imionaZenskie))
typImienia := "nieokreślone"
method jakieImie(imie) {
    if incl(imionaMeskie imie) {
        typImienia > "męskie"
    } else {
        typImienia > "żeńskie"
    }
}

each(imiona {|imie|
    jakieImie(imie)

    printf("$0 to imię $1" imie typImienia)
})