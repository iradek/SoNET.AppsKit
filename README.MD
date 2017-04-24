# sonet-appskit

## Description

This is a set of common services and components helping to create SoNET enabled apps. 

## Installation

```bash
$ npm install sonet-appskit --save
```

## Using the library from typescript

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Import your library
import { SoNETAppsKitModule } from 'sonet-appskit';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    SoNETAppsKitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## SoNET Engine

For more information about SoNET engine please visit: http://www.iradek.com

## License

MIT © [i-Radek Software](mailto:iradek@iradek.com)
