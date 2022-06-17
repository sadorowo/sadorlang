imionaMeskie! := { "Franek", "Kamil", "Mateusz", "Tomek", "Karol" }
imionaZenskie! := { "Wiktoria", "Karolina", "Ania" }

imiona := shuffle(concat(imionaMeskie, imionaZenskie))
method jakieImie(imie) {
    if incl(imionaMeskie, imie) {
        return "męskie"
    } else {
        return "żeńskie"
    }
}

each(imiona, { |imie| ->
    printf("$0 to imię $1", imie, jakieImie(imie))
})