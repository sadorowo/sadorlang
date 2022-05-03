sador := {dict}{ imie: "Franek" wiek: 15 zainteresowania: { "IT" "Sport" } }

each(entries(sador) { |param| 
    key := at(param 0)
    val := at(param 1)

    print("Parametr" key "obiektu <sador> jest rowny" val)
})