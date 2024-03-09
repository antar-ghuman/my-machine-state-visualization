```markdown
# Machine State Visualization Demo

This project is a user interface (UI) developed to visualize machine states for a given period of time. It utilizes React and the Recharts library to create interactive charts, allowing users to explore machine states and power usage trends.

## Features

- Visualize machine states over time using line charts.
- Select different time periods (1 hour, 3 hours, 6 hours, 12 hours, or 24 hours) to view average power draw.
- Analyze operational efficiency with pie charts showing the distribution of machine states.
- Calculate and display average changeover time for tool changes.

## Installation and Setup

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/machine-state-visualization.git
```

2. Navigate to the project directory:

```bash
cd machine-state-visualization
```

3. Install dependencies using npm or yarn:

```bash
npm install
```
or
```bash
yarn install

Here are the command lines to install the other dependencies:

```bash
npm install axios bootstrap chart.js react react-chartjs-2 react-dom react-scripts
```

or

```bash
yarn add axios bootstrap chart.js react react-chartjs-2 react-dom react-scripts
```

Users can run either of these commands in their terminal to install the required dependencies for the project.
```

4. Run the development server:

```bash
npm start
```
or
```bash
yarn start
```

5. Open your web browser and visit `http://localhost:3000` to view the demo.

## Usage

- Use the dropdown menu to select different time periods and observe changes in the charts.
- Hover over data points in the charts to view detailed information.
- Explore different insights provided by the charts to gain a better understanding of machine states and power usage.
