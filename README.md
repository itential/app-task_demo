# Itential Platform Task Demo App

This sample application (app-task_demo) demonstrates both AngularJS and React task implementations for the Itential Platform:

- **AngularJS Tasks**: Supported through Itential Platform 2023.2.x
- **React Tasks**: Recommended for Itential Platform

## Tasks Included

This app contains three tasks defined in `pronghorn.json`:

1. **Automated Task**: A simple automated task execution
2. **Manual React Task**: Modern React-based manual task implementation
3. **Manual AngularJS Task**: Legacy AngularJS-based manual task implementation

## Development Setup

### Installation

Install all dependencies:

```bash
npm install
```

### Building the Application

To build the React components in the tasks directory:

```bash
npm run build:tasks
```

This command compiles the React components in `views/tasks/src` using webpack and generates the output in `views/tasks/dist`.

## Project Structure

### AngularJS
- `/views/tasks/testViewAngularJS/` - Contains AngularJS task implementation

### React
- `/views/tasks/src/` - Contains React components for task views
- `/views/tasks/dist/` - Output directory for compiled task views
- `/views/tasks/webpack.config.js` - Webpack configuration for task views

### Sample Workflow
- `/assets/` - Contains a sample workflow that can be imported into Itential Platform Studio to test this application

## Troubleshooting

If you encounter webpack build issues:

1. Ensure all dependencies are installed: `npm install`
2. Check for React version compatibility issues
3. Verify the webpack configuration is correctly set up
4. Make sure all required loaders (postcss-loader, css-loader, etc.) are installed

## Notes for Developers

- The application uses Module Federation for sharing dependencies
- React components should handle null/undefined values for task.variables
- Use optional chaining and default objects to prevent runtime errors
- This app is for testing purposes and example sharing only

## License

### Sample App Code License

This sample application code is licensed under the Apache License 2.0:

```
Copyright 2025

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

### Itential Platform License

The Itential Platform itself is a commercial product with its own licensing terms. This sample app is designed to work with the Itential Platform but does not include any proprietary Itential code. Using this sample app with the Itential Platform requires a valid Itential Platform license.