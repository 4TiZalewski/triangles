// @ts-check
/**
 * @type {HTMLInputElement | null}
 */
const form_submit_button = document.querySelector("#form-submit");

/**
 * @type {HTMLDivElement | null}
 */
const display_element = document.querySelector("#display");

/**
 * @type {HTMLInputElement | null}
 */
const triangle_a = document.querySelector("#a");

/**
 * @type {HTMLInputElement | null}
 */
const triangle_b = document.querySelector("#b");

/**
 * @type {HTMLInputElement | null}
 */
const triangle_c = document.querySelector("#c");

if (form_submit_button) {
    form_submit_button.addEventListener("click", event => {
        event.preventDefault();

        if (validate(display_element, triangle_a, triangle_b, triangle_c)) {
            // We have validated that it is not null
            // Converting types
            const display = /** @type {HTMLDivElement} */ (display_element);
            const a = /** @type {HTMLInputElement} */ (triangle_a);
            const b = /** @type {HTMLInputElement} */ (triangle_b);
            const c = /** @type {HTMLInputElement} */ (triangle_c);

            if (validate_inputs(a, b, c, display)) {
                const a_value = Number(a.value);
                const b_value = Number(b.value);
                const c_value = Number(c.value);

                if (validate_triangle(a_value, b_value, c_value)) {
                    /**
                     * @type {number}
                     */
                    const pole = calculate_pole(a_value, b_value, c_value);
                    display.innerText = `Z boków ${a_value}, ${b_value} i ${c_value} można złożyć trójkąt\nPole trójkąta wynosi: ${pole.toFixed(2)}`;
                } else {
                    display.innerText = `Z boków ${a_value}, ${b_value} i ${c_value} nie można złożyć trójkąta!`;
                }
            }
        }
   });
} else {
    console.warn("No submit button!");
}

/**
 * @param {number} a 
 * @param {number} b 
 * @param {number} c 
 * @returns {number}
 */
function calculate_pole(a, b, c) {
    /**
     * @type {number}
     */
    const p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

/**
 * Checks if all nessesary elements are not null and returns if they exists
 * @param {HTMLDivElement | null} display 
 * @param {HTMLInputElement | null} a 
 * @param {HTMLInputElement | null} b 
 * @param {HTMLInputElement | null} c 
 * @returns {boolean}
 */
function validate(display, a, b, c) {
    /**
     * @type {boolean}
     */
    let result = true;
    if (!display) { console.warn("No display element!"); result = false; }
    if (!a) { console.warn("No triangle a element!"); result = false; }
    if (!b) { console.warn("No triangle b element!"); result = false; }
    if (!c) { console.warn("No triangle c element!"); result = false; }

    return result;
}

/**
 * Validates all nessesary inputs to create triangle with error output
 * @param {HTMLInputElement} a 
 * @param {HTMLInputElement} b 
 * @param {HTMLInputElement} c 
 * @param {HTMLDivElement} error_out
 * @returns {boolean}
 */
function validate_inputs(a, b, c, error_out) {
    /**
     * @type {boolean}
     */
    let result = true;
    let error_msg = "Podaj prawidłowe liczby w";

    if (!validate_input(a)) { error_msg += " 1 boku,"; result = false; }
    if (!validate_input(b)) { error_msg += " 2 boku,"; result = false; }
    if (!validate_input(c)) { error_msg += " 3 boku,"; result = false; }

    error_msg = error_msg.substring(0, error_msg.length - 1);
    error_out.innerText = error_msg + "!";

    return result;
}

/**
 * @param {HTMLInputElement} input_element
 * @returns {boolean}
 */
function validate_input(input_element) {
    const value = Number(input_element.value);
    return !isNaN(value) && value > 0;
}

/**
 * @param {number} a 
 * @param {number} b 
 * @param {number} c 
 * @returns {boolean}
 */
function validate_triangle(a, b, c) {
    return a < b + c &&
           b < a + c &&
           c < a + b;
}