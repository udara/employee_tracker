class SampleClass {
    constructor() {
        console.log(`im inside constructor`);  
    }

    oneMethod() {
        console.log(`I'm inside oneMethod`);
    }

    anotherMethod() {
        console.log(`I'm inside another Method`);
    }
}

const im_an_instance_of_sample_class = new SampleClass();

im_an_instance_of_sample_class.oneMethod();

im_an_instance_of_sample_class.anotherMethod();
