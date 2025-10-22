// Clasa de bază
class Software {
    constructor(name, version) {
        this.name = name;
        this.version = version;
    }

    run() {
        console.log(`Running ${this.name} version ${this.version}`);
    }
}

// Clasa Plugin
class Plugin {
    constructor(name) {
        this.name = name;
    }

    activate() {
        console.log(`Plugin ${this.name} activated`);
    }
}

// Clasa Browser care moștenește Software
class Browser extends Software {
    constructor(name, version) {
        super(name, version);
        this.tabs = [];
        this.plugins = []; // lista de pluginuri instalate
    }

    addTab(tab) {
        this.tabs.push(tab);
    }

    listTabs() {
        console.log(`Tabs in ${this.name}:`);
        this.tabs.forEach((tab, index) => {
            console.log(`Tab ${index + 1}: ${tab.url}`);
        });
    }

    // Instalează un plugin
    installPlugin(plugin) {
        this.plugins.push(plugin);
        console.log(`Installed plugin: ${plugin.name}`);
    }

    // Activează toate pluginurile
    activatePlugins() {
        console.log(`Activating plugins in ${this.name}:`);
        this.plugins.forEach(plugin => plugin.activate());
    }

    // Listează pluginurile instalate
    listPlugins() {
        console.log(`Plugins installed in ${this.name}:`);
        this.plugins.forEach((plugin, index) => {
            console.log(`Plugin ${index + 1}: ${plugin.name}`);
        });
    }
}

// Clasa Tab
class Tab {
    constructor(url) {
        this.url = url;
    }
}

// Test complet
const browser = new Browser('MyBrowser', '2.0');
browser.run();

browser.addTab(new Tab('http://example.com'));
browser.addTab(new Tab('http://another-example.com'));
browser.listTabs();

// Instalăm pluginuri
browser.installPlugin(new Plugin('AdBlocker'));
browser.installPlugin(new Plugin('Dark Mode'));
browser.listPlugins();

// Activăm pluginurile
browser.activatePlugins();
