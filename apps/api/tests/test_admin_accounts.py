from app.v1.store import get_store

from test_contract import sign_in


def test_admin_invite_and_suspend():
    admin = sign_in("A-0100")
    created = admin.post(
        "/api/v1/admin/accounts/invite",
        json={"email": "new.expert@example.org", "role": "Religion expert"},
    )
    assert created.status_code == 200, created.text
    row = created.json()
    assert row["status"] == "invited"
    assert row["role"] == "expert"
    patched = admin.patch(
        f"/api/v1/admin/accounts/{row['id']}",
        json={"status": "suspended"},
    )
    assert patched.status_code == 200
    assert patched.json()["status"] == "suspended"
    assert admin.post(f"/api/v1/admin/accounts/{row['id']}/resend-invite").status_code == 422
    assert admin.post(f"/api/v1/admin/accounts/{row['id']}/password-reset").status_code == 204
    assert any(a["action"] == "invite" for a in get_store().audit)
