function mod(x, y) {
    return x % y;
}

function abs(n) {
    return Math.abs(n);
}

function pow(n, m) {
    return Math.pow(n, m);
}

function sqrt(x) {
    return Math.sqrt(x);
}

function sm(x, y) {
    return x < y;
}

function gt(x, y) {
    return x > y;
}

function eq(o1, o2) {
    return o1 === o2;
}

function add(...nums) {
    let total = nums[0];

    for (let i = 1; i <= nums.length; ++i) {
        if (!isNaN(nums[i])) total += nums[i];
    }

    return total;
}

function subst(...nums) {
    let total = nums[0];

    for (let i = 1; i <= nums.length; ++i) {
        if (!isNaN(nums[i])) total -= nums[i];
    }

    return total;
}

function mult(...nums) {
    let total = nums[0];

    for (let i = 1; i <= nums.length; ++i) {
        if (!isNaN(nums[i])) total *= nums[i];
    }

    return total;
}

function div(...nums) {
    let total = nums[0];

    for (let i = 1; i <= nums.length; ++i) {
        if (!isNaN(nums[i])) total /= nums[i];
    }

    return total;
}

function fixed(int, digits = undefined) {
    return !isNaN(int) ? Number(int).toFixed(digits) : int
}