val imie = "dawniej sador"
unlock imie

val mut imie = "Sador"
Sys:Printf(imie)

lock imie
# val imie = "sador" [ERROR: must use 'unlock imie']
# Console:Println(imie)