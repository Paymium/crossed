<h1 style="border-bottom: 0; font-size: 5rem; ">@Crossed/styled</h1>

## Introduction

@Crossed/styled is here to streamline your styling workflow, offering the same ease of use as style-components but with a cross-platform twist.
Additionally, CSS simplifies maintenance and scalability, allowing for consistent style changes and design expansion as the website evolves.

## Installation

```
pnpm i @crossed/styled react-native-unistyles
```

## Configuration

finish installation and configure react-native-unistyles, need elp to configure react-native-unistyles ? look [here](https://reactnativeunistyles.vercel.app/start/setup/#3-configure-unistyles-with-unistylesregistry)

## Getting Strated

All you need to do is import styled from @crossed/styled and a component from any of your favorite UI library
Then style your component as you want and use it in your app as shown below

```
import { styled } from '@crossed/styled';
import { Text } from "react-native";

const TextStyled = styled(Text, {
  color: "red"
});

function App () {
  return <TextStyled>Hello World!</TextStyled>;
}
```

Go check our [documentation](https://paymium.github.io/crossed/styled) to find more details.

## Contribution

Want to Contribute to our project ? Check our [contribution guide line](link)
