import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getPlatformSettings, listShops, updateShop } from '../api';
import { Loading, btnGhost, inputCls } from '../components/ui';

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState('');
  const [payment, setPayment] = useState({ profile_id: '', secret_key: '', test_mode: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPlatformSettings(), listShops()]).then(([platform, shopList]) => {
      setSettings(platform);
      setShops(shopList);
      if (shopList.length) {
        const firstShop = shopList[0];
        setShopId(String(firstShop.id));
        setPayment({ profile_id: firstShop.aba_settings?.profile_id || '', secret_key: firstShop.aba_settings?.secret_key || '', test_mode: firstShop.aba_settings?.test_mode !== false });
      }
    }).finally(() => setLoading(false));
  }, []);

  const selectShop = (value, shopList = shops) => {
    const shop = shopList.find((item) => String(item.id) === value);
    setShopId(value);
    setPayment({ profile_id: shop?.aba_settings?.profile_id || '', secret_key: shop?.aba_settings?.secret_key || '', test_mode: shop?.aba_settings?.test_mode !== false });
  };

  const savePayment = async () => {
    try {
      await updateShop(shopId, { aba_settings: payment });
      toast.success('Payment settings saved');
    } catch (e) { toast.error(e?.response?.data?.detail || 'Failed to save payment settings'); }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Platform Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-lg mb-4">Contact & Account Creation</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block">Telegram Contact</label>
              <input value={settings.contact_telegram} readOnly className={`${inputCls} bg-gray-50`} />
              <p className="text-xs text-gray-400 mt-1">Users contact this Telegram account to get shop accounts created.</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block">Default Admin Username</label>
              <input value={settings.default_admin} readOnly className={`${inputCls} bg-gray-50`} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-lg mb-4">Default Telegram Bot</h2>
          <p className="text-sm text-gray-500 mb-3">
            Used for platform-level notifications. Each shop configures its own bot token and chat ID in the Shop Dashboard.
          </p>
          <div>
            <label className="text-sm font-medium text-gray-700 block">Bot Token</label>
            <input
              value="•••••••••••••••• (configured securely on the server)"
              readOnly
              className={`${inputCls} bg-gray-50 font-mono text-xs`}
            />
            <p className="text-xs text-gray-400 mt-1">Tokens are stored on the server and never exposed in the frontend bundle.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-lg mb-4">Security</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex justify-between border-b pb-2">
              <span>JWT authentication</span>
              <span className="text-green-600 font-semibold">✓ Enabled</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Rate limiting</span>
              <span className="text-green-600 font-semibold">✓ 60 req/min</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Password hashing</span>
              <span className="text-green-600 font-semibold">✓ bcrypt</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Self-registration</span>
              <span className="text-red-600 font-semibold">✗ Disabled</span>
            </li>
            <li className="flex justify-between">
              <span>File upload restrictions</span>
              <span className="text-green-600 font-semibold">✓ Images only (max 8MB)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-lg mb-4">Payment</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <select value={shopId} onChange={(e) => selectShop(e.target.value)} className={inputCls}>
              {shops.length === 0 && <option value="">No shops found</option>}
              {shops.map((shop) => <option key={shop.id} value={shop.id}>{shop.shop_name || shop.username} (@{shop.username})</option>)}
            </select>
            <input value={payment.profile_id} onChange={(e) => setPayment({ ...payment, profile_id: e.target.value })} className={inputCls} placeholder="ABA Profile ID / API ID" />
            <input type="password" value={payment.secret_key} onChange={(e) => setPayment({ ...payment, secret_key: e.target.value })} className={inputCls} placeholder="ABA Secret Key / API Key" />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={payment.test_mode} onChange={(e) => setPayment({ ...payment, test_mode: e.target.checked })} /> Sandbox / test mode
            </label>
            <button onClick={savePayment} disabled={!shopId} className={`${btnGhost} disabled:opacity-50`}>Save Payment Settings</button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
        <strong>Note:</strong> Configure each shop&apos;s ABA Profile ID and Secret/API Key from
        <strong> Shops → Manage → Overview</strong>. Secret values are only returned to authenticated admins and are
        never exposed through the public storefront. Rate-limit tuning is done in the backend config
        (<code className="font-mono">Backend_API/config.py</code>).
      </div>
    </div>
  );
}
