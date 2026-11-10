# GitHub Trending CLI 🚀

A robust, standalone Command-Line Interface (CLI) tool built with Node.js that fetches and displays the most popular, newly created repositories on GitHub. 

Instead of browsing the web, you can now discover trending open-source projects directly from your terminal, filtered by your favorite programming language and specific timeframes.

## Features

* **Global Execution:** Runs natively in your terminal using the `trending` command.
* **Dynamic Timeframes:** Filter trending repositories by the last `day`, `week`, `month`, or `year`.
* **Language Support:** Search across all of GitHub or narrow it down to a specific language (e.g., Python, JavaScript, Rust).
* **Customizable Output:** Control exactly how many results you want to see.
* **Beautiful Formatting:** Displays data in a clean, readable terminal table.
* **Robust Error Handling:** Safely catches API rate limits, invalid user inputs, and network failures.

## Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (comes installed with Node.js)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/github-trending-cli.git
   cd github-trending-cli
   ```

2. **Install dependencies:**
   This project uses `undici` for fast, native HTTP requests.
   ```bash
   npm install
   ```

3. **Link the package globally:**
   To use this tool as a standalone command anywhere on your machine, link it using npm:
   ```bash
   npm link
   ```

## Usage

Once linked, you can run the tool from anywhere in your terminal using the `trending` command.

**Basic Usage (Defaults to top 10 repos from the past week):**
```bash
trending
```

**Advanced Usage (Mixing flags):**
```bash
trending --duration month --lang python --limit 5
```

## Options / Flags

| Flag | Description | Default | Allowed Values |
| :--- | :--- | :--- | :--- |
| `--duration` | The time range to search for newly created repositories. | `week` | `day`, `week`, `month`, `year` |
| `--limit` | The maximum number of repositories to display in the table. | `10` | Any positive integer |
| `--lang` | Filter the repositories by a specific programming language. | *None (All)* | e.g., `javascript`, `python`, `c++` |

## Tech Stack

* **Runtime:** Node.js (ES Modules)
* **HTTP Client:** `undici`
* **Data Source:** [GitHub REST API](https://docs.github.com/en/rest)

## License

This project is open-source and available under the [MIT License](LICENSE).
