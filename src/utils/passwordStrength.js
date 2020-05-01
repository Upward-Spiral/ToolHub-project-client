
export const hasNumber = (value) => {
    return new RegExp(/[0-9]/).test(value);
 }
export const hasMixed = (value) => {
    return new RegExp(/[a-z]/).test(value) &&
             new RegExp(/[A-Z]/).test(value);
 }
export const hasSpecial = (value) => {
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
 }
export const strengthColor = (count) => {
    if (count < 2)
       return 'red';
    if (count < 3)
       return 'yellow';
    if (count < 4)
       return 'orange';
    if (count < 5)
       return 'lightgreen';
    if (count < 6)
       return 'green';
}
export const lengthIndicator = (value) => {
    let strengths = 0;
    if (value.length > 5)
       strengths++;
    if (value.length > 7)
       strengths++;
    if (hasNumber(value))
       strengths++;
    if (hasSpecial(value))
       strengths++;
    if (hasMixed(value))
       strengths++;
    return strengths;
}