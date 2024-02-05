<h1 style="border-bottom: 0; font-size: 5rem; ">@Crossed/primitive</h1>

## Introduction

@Crossed/primitive is here to give you the freedom to create hight end custom component without worrying about accessibility. Create function in @crossed/primitive already handle all this logic for you. Provide some component to our function and let the magic happen.

## Installation

```
pnpm i @crossed/primitive
```

## Getting Strated

All you need to do is import your desired create function from @crossed/primitive and use it with the appropriate arguments more details can be found for each create function on our documentation [documentation](https://paymium.github.io/crossed/styled)

```
import { createLabel } from '@crossed/primitive';

const MyRoot = () => {
    return (
        //your desired Root component
    )
}
const MyInput = () => {
    return (
        //your desired Input component
    )
}

const MyLabelText = () => {
    return (
        //your desired text label component
    )
}

const MyLabel = createLabel({MyRoot, MyInput, MyLabelText})
```

## Contribution

Want to Contribute to our project ? Check our [contribution guide line](link)
