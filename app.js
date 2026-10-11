/*
 * MAXIMUS OPTIMUS portal prototype.
 * Supabase is optional until you add your project URL/key and configure Auth providers.
 * Never put a Supabase service_role key in browser code.
 */
const SUPABASE_URL = ""; // Add your Supabase project URL
const SUPABASE_ANON_KEY = ""; // Add your Supabase publishable/anon key only
let supabaseClient = null;

if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const $ = (selector) => document.querySelector(selector);
const toast = $("#toast");

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(notify.timeout);
  notify.timeout = window.setTimeout(() => toast.classList.remove("show"), 3500);
}

function setLoginMessage(message, success = false) {
  const el = $("#loginMessage");
  el.textContent = message;
  el.style.color = success ? "#8ff6ce" : "#ffd28a";
}

$("#menuToggle").addEventListener("click", () => {
  const nav = $(".topnav");
  const open = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(open));
});

$("#employeeProvider").addEventListener("change", (event) => {
  const provider = event.target.value;
  const emailField = $("#emailInput");
  const passwordField = $("#passwordInput");
  const form = $("#loginForm");
  if (provider === "email") {
    emailField.closest("label")?.classList.remove("hidden");
    emailField.placeholder = "name@company.com";
    passwordField.placeholder = "Enter your password";
  } else if (provider === "phone") {
    emailField.type = "tel";
    emailField.autocomplete = "tel";
    emailField.placeholder = "Phone number";
    passwordField.placeholder = "Password or configured verification code";
  } else {
    emailField.type = "email";
    emailField.autocomplete = "username";
    emailField.placeholder = "Work email";
    passwordField.placeholder = "Password";
  }
});

$("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const provider = $("#employeeProvider").value;
  const email = $("#emailInput").value.trim();
  const password = $("#passwordInput").value;

  if (!supabaseClient) {
    setLoginMessage("Prototype mode: add Supabase URL/key and configure Auth before sign-in can work.");
    return;
  }
  if (provider !== "email") {
    setLoginMessage("Choose an enabled provider button below, or configure this provider in Supabase Auth.");
    return;
  }
  if (!email || !password) {
    setLoginMessage("Enter your work email and password.");
    return;
  }
  setLoginMessage("Signing in…", true);
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    setLoginMessage(error.message);
    return;
  }
  setLoginMessage("Signed in. Connect this prototype to your protected workspace route next.", true);
  notify("Authentication succeeded; workspace routing still needs to be configured.");
});

document.querySelectorAll("[data-provider]").forEach((button) => {
  button.addEventListener("click", async () => {
    const provider = button.dataset.provider;
    if (provider === "phone") {
      $("#employeeProvider").value = "phone";
      $("#emailInput").type = "tel";
      $("#emailInput").placeholder = "Phone number";
      $("#emailInput").focus();
      setLoginMessage("Phone sign-in requires a configured Supabase phone provider and SMS settings.");
      return;
    }
    if (provider === "email") {
      $("#employeeProvider").value = "email";
      $("#emailInput").focus();
      setLoginMessage("Enter your email and password above.");
      return;
    }
    if (!supabaseClient) {
      setLoginMessage(`Prototype mode: configure Supabase Auth for ${provider} before enabling this sign-in.`);
      return;
    }
    const providerMap = { google: "google", apple: "apple" };
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: providerMap[provider],
      options: { redirectTo: window.location.origin }
    });
    if (error) setLoginMessage(error.message);
  });
});

$("#forgotPassword").addEventListener("click", async () => {
  const email = $("#emailInput").value.trim();
  if (!supabaseClient) {
    setLoginMessage("Password reset becomes available after Supabase Auth is configured.");
    return;
  }
  if (!email) {
    setLoginMessage("Enter your email address first, then select Forgot password.");
    $("#emailInput").focus();
    return;
  }
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
  setLoginMessage(error ? error.message : "If this account exists, a password-reset email will be sent.", !error);
});

$("#connectButton").addEventListener("click", () => {
  const connector = $("#connectorSelect").value;
  if (!connector) {
    $("#connectorMessage").textContent = "Choose a connector first.";
    return;
  }
  $("#connectorMessage").textContent = `${connector} selected. An administrator must register its adapter, credentials, scopes, and callback URLs before connection can begin.`;
});

document.querySelectorAll(".topnav a, .footer a, .market-button").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#") && !document.querySelector(href)) {
      event.preventDefault();
      notify(`${link.textContent.trim()} page is a planned destination in this UI prototype.`);
    }
  });
});
