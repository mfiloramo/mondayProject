
<p align="center">
   <img src="public/readme-logos/monday-app-banner.png" width="100%" alt="monday-client-app-banner">
</p>

This client application provides an interface for managing candle orders, specifically integrated with the Monday.com platform. It allows users to place orders, manage fragrance offerings, and interact with the Monday.com boards to achieve this functionality. This repo is one of three for this application; the API can be found <a href="https://github.com/mfiloramo/mondayProjectAPI">here</a>, and the T-SQL Tables and Stored Procedures can be found <a href="https://github.com/mfiloramo/mondayProjectSQL">here</a>.

<hr>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Interacting with the Application](#interacting-with-the-application)
- [Tech Stack](#tech-stack)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/mfiloramo/mondayProject.git
    cd mondayProject
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

The client application allows users to place candle orders, select fragrances, and interact with the Monday.com platform. To run the application locally, use the following command:

```bash
npm run dev
```

This will start the application in development mode on the specified  using the `next dev server`.

To run the application in development using <a href="https://turbo.build/pack">Turbopack</a>, an experimental Rust-powered incremental build tool available within Next.js, run the following command:

```bash
npm run turbo
```

This will leverage Turbopack to run the development server. Changes in development will now be incremental, so you can enjoy significantly streamlined development in your browser. Note that this tool is in beta and currently does not yet support build outputs.

## Interacting with the Application

The application consists of several key components:

### Order Maker

1. **Input Customer Details**:
    - Enter the customer's first name and last name.
    - <p align="center"><img src="public/readme-screenshots/orders-input-name.png" alt="Screenshot Placeholder"></p>

2. **Select Fragrances**:
    - Use the dropdown to select exactly 3 fragrances for the order.
    - <p align="center"><img src="public/readme-screenshots/orders-input-fragrances.png" alt="Screenshot Placeholder"></p>

3. **Specify Quantity**:
    - Use the quantity selector to specify the number of kits.
    - <p align="center"><img src="public/readme-screenshots/orders-input-quantity.png" alt="Screenshot Placeholder"></p>

4. **Submit Order**:
    - Click the "Submit Order" button to place the order.
    - <p align="center"><img src="public/readme-screenshots/orders-input-submit.png" alt="Screenshot Placeholder"></p>

5. **Clear Form**:
    - Use the "Clear Form" button to reset all input fields.
    - <p align="center"><img src="public/readme-screenshots/orders-input-clear.png" alt="Screenshot Placeholder"></p>

### Monday.com Boards

#### Fragrances Board

- **View Fragrances**:
    - Displays all available fragrances.
    - <p align="center"><img src="public/readme-screenshots/fragrances-board-view.png" alt="Screenshot Placeholder"></p>

- **Add/Update/Delete Fragrances**:
    - Directly interact with the fragrances board to manage fragrance offerings.
    - <p align="center"><img src="public/readme-screenshots/fragrances-board-change.png" alt="Screenshot Placeholder"></p>

#### Orders Board

- **View Orders**:
    - Displays all placed orders and their statuses.
    - <p align="center"><img src="public/readme-screenshots/orders-board-view.png" alt="Screenshot Placeholder"></p>

- **Update Order Status**:
    - Change the status of an order directly on the board.
    - <p align="center"><img src="public/readme-screenshots/orders-board-status.png" alt="Screenshot Placeholder"></p>

## Tech Stack

This project utilizes a modern tech stack to ensure both robustness and ease of development. Below is a brief overview of the technologies used and why they were chosen.

<table style="border-collapse: collapse; border: none;">
  <tr>
    <td style="padding: 10px;">
      <img src="public/readme-logos/typescript-logo.png" height="45" alt="TypeScript Logo"><br>
      A statically typed superset of JavaScript that enhances code quality and readability. Chosen for its robust type-checking and improved developer productivity.
    </td>
    <td style="padding: 10px;">
      <img src="public/readme-logos/react-logo.png" height="45" alt="React Logo"><br>
      A JavaScript library for building user interfaces. Chosen for its component-based architecture, simple state management, and compatibility with the Monday.com platform.
    </td>
  </tr>
  <tr>
    <td style="padding: 10px;">
      <img src="public/readme-logos/nextjs-logo.png" height="35" alt="Next.js Logo"><br>
      A React framework with hybrid static & server rendering, and route pre-fetching. Chosen for its fast setup and performance optimization capabilities.
    </td>
    <td style="padding: 10px;">
      <img src="public/readme-logos/vibe-logo.png" height="45" alt="Vibe Logo"><br>
      A design system by Monday.com for building consistent and cohesive user interfaces. Chosen for seamless integration with the Monday.com platform.
    </td>
  </tr>
  <tr>
    <td style="padding: 10px;">
      <img src="public/readme-logos/tailwind-logo.png" height="25" alt="Tailwind CSS Logo"><br>
      A utility-first CSS framework for rapidly building custom designs. Chosen for its flexibility and ease of use in user interface layout.
    </td>
    <td style="padding: 10px;">
      <img src="public/readme-logos/turbopack-logo.png" height="32" alt="Turbopack Logo"><br>
      An experimental, Rust-powered, incremental build tool for Next.js applications. Chosen for its performance and speed in application bundling during development.
    </td>
  </tr>
</table>


## Application Flow
Below is a diagram illustrating the flow of data within the client application. Data flows from the frontend to the backend API, which processes requests by firing stored procedures that interact with the database, and updates are synchronized with Monday.com via webhooks.

<p align="center">
   <img src="public/readme-screenshots/monday-app-flow.drawio.svg" width="60%">
</p>
<br><br>