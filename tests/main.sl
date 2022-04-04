def string text = "Hello, World"
def fixed int = 2137
def float f = 0.0

fn Main()
{
    $PrintText($text)
}

fn PrintText($text)
{
    if ne(Type($text), string)
    raise TypeException("{} must be string":Fmt($text))

    Println($text:Map($key -> "{} \n":Fmt($key)))
}
