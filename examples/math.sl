_add := add(1 2 3)
_subst := subst(1 2 3)
_mult := mult(1 2 3)
_div := div(1 2 3)

printf("1+2+3 = $0\\n1-2-3 = $1\\n1*2*3 = $2\\n1/2/3 = $3" _add _subst _mult fixed(_div 2))