var or = ['o-', 'r-', 'or-']
var t = ['a-', 'Tb-', 'Ta-']
var d = ['d-', 'D-']
//var i = ['i-', 'I-']
//var s = ['s-', 'S1-', 'S2-']
var b = ['b-', 'bl-', 'b0-']

function combineArrays( array_of_arrays ){

    // First, handle some degenerate cases...

    if( ! array_of_arrays ){
        // Or maybe we should toss an exception...?
        return [];
    }

    if( ! Array.isArray( array_of_arrays ) ){
        // Or maybe we should toss an exception...?
        return [];
    }

    if( array_of_arrays.length == 0 ){
        return [];
    }

    for( let i = 0 ; i < array_of_arrays.length; i++ ){
        if( ! Array.isArray(array_of_arrays[i]) || array_of_arrays[i].length == 0 ){
            // If any of the arrays in array_of_arrays are not arrays or zero-length, return an empty array...
            return [];
        }
    }

    // Done with degenerate cases...

    // Start "odometer" with a 0 for each array in array_of_arrays.
    let odometer = new Array( array_of_arrays.length );
    odometer.fill( 0 ); 

    let output = [];

    let newCombination = formCombination( odometer, array_of_arrays );

    output.push( newCombination );

    while ( odometer_increment( odometer, array_of_arrays ) ){
        newCombination = formCombination( odometer, array_of_arrays );
        output.push( newCombination );
    }

    return output;
}/* combineArrays() */


// Translate "odometer" to combinations from array_of_arrays
function formCombination( odometer, array_of_arrays ){
    // In Imperative Programmingese (i.e., English):
    // let s_output = "";
    // for( let i=0; i < odometer.length; i++ ){
    //    s_output += "" + array_of_arrays[i][odometer[i]]; 
    // }
    // return s_output;

    // In Functional Programmingese (Henny Youngman one-liner):
    return odometer.reduce(
      function(accumulator, odometer_value, odometer_index){
        return "" + accumulator + array_of_arrays[odometer_index][odometer_value];
      },
      ""
    );
}/* formCombination() */

function odometer_increment( odometer, array_of_arrays ){

    // Basically, work you way from the rightmost digit of the "odometer"...
    // if you're able to increment without cycling that digit back to zero,
    // you're all done, otherwise, cycle that digit to zero and go one digit to the
    // left, and begin again until you're able to increment a digit
    // without cycling it...simple, huh...?

    for( let i_odometer_digit = odometer.length-1; i_odometer_digit >=0; i_odometer_digit-- ){ 

        let maxee = array_of_arrays[i_odometer_digit].length - 1;         

        if( odometer[i_odometer_digit] + 1 <= maxee ){
            // increment, and you're done...
            odometer[i_odometer_digit]++;
            return true;
        }
        else{
            if( i_odometer_digit - 1 < 0 ){
                // No more digits left to increment, end of the line...
                return false;
            }
            else{
                // Can't increment this digit, cycle it to zero and continue
                // the loop to go over to the next digit...
                odometer[i_odometer_digit]=0;
                continue;
            }
        }
    }/* for( let odometer_digit = odometer.length-1; odometer_digit >=0; odometer_digit-- ) */

}/* odometer_increment() */

var result = combineArrays([or, b, d, t])
result = result.filter(function(e) {
	if (e.match(/.*\br-.*\ba-.*/)
		|| e.match(/.*\br-.*\bb0-.*/)
		|| e.match(/.*\br-.*\bbl-.*/)) {
		console.log('excluded '+e)
		return false
	}
	return true
})
for (let index = 0; index<result.length; index++) {
	let e = result[index];
	/*e = e.replace(/\bo-/, 'черный ')
	e = e.replace(/\br-/, 'рыжий ')
	e = e.replace(/\bor-/, 'черно-рыжий ')
	e = e.replace(/\bb-/, '')
	e = e.replace(/\bbl-/, 'шоколадный ')
	e = e.replace(/\bb0-/, 'светлокоричневый ')
	e = e.replace(/\bd-/, '')
	e = e.replace(/\bD-/, 'голубой ')*/
    e = e.replace(/\br-b-d-/, 'рыжий ')
    e = e.replace(/\br-b-D-/, 'кремовый ')
    e = e.replace(/\bo-b-d-/, 'черный ')
    e = e.replace(/\bo-b-D-/, 'сероголубой ')
    e = e.replace(/\bo-bl-d-/, 'шоколадный ')
    e = e.replace(/\bo-bl-D-/, 'lilac ')
    e = e.replace(/\bo-b0-d-/, 'светлокоричневый ')
    e = e.replace(/\bo-b0-D-/, 'fawn ')
    e = e.replace(/\bor-b-d-/, 'рыже-черный ')
    e = e.replace(/\bor-b-D-/, 'кремово-сероголубой ')
    e = e.replace(/\bor-bl-d-/, 'рыже-шоколадный ')
    e = e.replace(/\bor-bl-D-/, 'кремово-lilac ')
    e = e.replace(/\bor-b0-d-/, 'рыже-светлокоричневый ')
    e = e.replace(/\bor-b0-D-/, 'кремово-fawn ')
	e = e.replace(/\bTm-/, 'мраморный ')
	e = e.replace(/\bTa-/, 'абиссинский ')
	e = e.replace(/\bTb-/, 'полосатый ')
	e = e.replace(/\ba-/, '')
	e = e.replace(/\bi-/, '')
	e = e.replace(/\bI-/, 'дымчатый ')
	e = e.replace(/\bs-/, '')
	e = e.replace(/\bS1-/, 'мелкие белые пятна ')
	e = e.replace(/\bS2-/, 'большие белые пятна ')
	result[index] = e + '= ' + result[index]
}
result.push('белый=W')
console.log(result.join('\n'))