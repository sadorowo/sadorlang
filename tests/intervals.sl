val cytaty = { "It's okay, i know someday I'm gonna be with you", "This world can hurt you", "I wanna cry and I wanna love", "are we too young for this?" }

# 10000ms = 10s
once 10000 {
    Sys:Printf("sadge cytat na teraz: $(0) ;c", Random:Choice(cytaty))   
}