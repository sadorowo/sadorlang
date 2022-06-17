if ! command -v node &> /dev/null
then
    echo "[error]: nodejs not installed"
    exit
else
    node ${0%/*}/ui/menu.js $*
fi