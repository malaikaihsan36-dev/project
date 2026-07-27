const db = require('../config/db');

// Helper to ensure table exists and is seeded
async function ensureSettingsTable() {
  try {
    await db.query('SELECT 1 FROM site_settings LIMIT 1');
  } catch (err) {
    if (err.code === 'ER_NO_SUCH_TABLE') {
      console.log('Creating site_settings table...');
      await db.query(`
        CREATE TABLE site_settings (
          setting_key VARCHAR(100) PRIMARY KEY,
          setting_value VARCHAR(255) NOT NULL
        )
      `);
      
      // Seed default exchange rates
      await db.query(`
        INSERT INTO site_settings (setting_key, setting_value) VALUES
        ('usd_rate', '0.0036'),
        ('gbp_rate', '0.0028'),
        ('eur_rate', '0.0033')
      `);
      console.log('site_settings table created and seeded successfully.');
    } else {
      throw err;
    }
  }
}

exports.getSettings = async (req, res) => {
  try {
    await ensureSettingsTable();
    const [rows] = await db.query('SELECT * FROM site_settings');
    const settings = {};
    rows.forEach(row => {
      settings[row.setting_key] = row.setting_value;
    });
    res.status(200).json(settings);
  } catch (err) {
    console.error('Error fetching settings:', err);
    res.status(500).json({ error: 'Failed to retrieve site settings.' });
  }
};

exports.updateSettings = async (req, res) => {
  const updates = req.body; // e.g. { usd_rate: '0.0036', gbp_rate: '0.0028', eur_rate: '0.0033' }
  try {
    await ensureSettingsTable();
    
    const queries = Object.entries(updates).map(([key, val]) => {
      return db.query(
        'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
        [key, String(val), String(val)]
      );
    });
    
    await Promise.all(queries);
    res.status(200).json({ message: 'Settings updated successfully.' });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ error: 'Failed to update site settings.' });
  }
};
